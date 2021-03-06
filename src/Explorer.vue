<template lang="html">
  <v-content v-if="loaded">
    <br>
    <router-view :key="JSON.stringify(blocks)" :blocks="blocks"
                 :getBlockRoster="getBlockRoster"
                 :getBlockByIndex="getBlockByIndex"
                 :getBlockByHash="getBlockByHash"></router-view>
  </v-content>
</template>

<script>
import { hex2Bytes } from './utils'
import { SkipchainRPC, SkipBlock } from '@dedis/cothority/skipchain'

const { localStorage } = window

// Defines how many entries the local storage should have at maximum.
const STORAGE_THRESHOLD = 10
const STORAGE_PREFIX = 'dedis_cache_'

const REGEX_SKIPCHAIN_ID = /^dedis_cache_[0-9a-f]+$/

/**
 * Encode the blocks as a string and store them at the given index which
 * is the ID of the skipchain.
 *
 * @param {string} id               The ID of the skipchain
 * @param {Array<SkipBlock>} blocks The list of blocks to store
 */
function storeBlocks (id, blocks) {
  if (localStorage.length > STORAGE_THRESHOLD) {
    let minLength = Number.MAX_SAFE_INTEGER
    let minIndex = -1
    // Look for the smallest update chain stored inside the local
    // storage to remove it because we're above the threshold number
    // of elements in the local storage.
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      if (REGEX_SKIPCHAIN_ID.test(key) && key !== `${STORAGE_PREFIX}${id}`) {
        const data = localStorage.getItem(key)
        if (!data || data.length < minLength) {
          minLength = data.length
          minIndex = i
        }
      }
    }

    if (minIndex >= 0) {
      localStorage.removeItem(localStorage.key(minIndex))
    }
  }

  const data = blocks.map((b) => {
    if (b && b.loaded) {
      return Buffer.from(SkipBlock.encode(b).finish()).toString('hex')
    }

    return null
  })
  localStorage.setItem(`${STORAGE_PREFIX}${id}`, data.join(':'))
}

/**
 * Loads the blocks from the local storage at the given index which
 * is the skipchain ID. It returns an empty array when it doesn't
 * exist or is corrupted.
 *
 * @param {string} id The skipchain ID
 * @returns {Array<SkipBlock>}
 */
function loadBlocks (id) {
  const data = localStorage.getItem(`${STORAGE_PREFIX}${id}`)
  if (!data) {
    return []
  }

  try {
    const encoded = data.split(':')

    return encoded.map((b, i) => {
      if (b) {
        return { ...SkipBlock.decode(Buffer.from(b, 'hex')), loaded: true }
      }

      return { loaded: false, index: i, height: 1 }
    })
  } catch (e) {
    // corrupted so we clean it
    localStorage.removeItem(`${STORAGE_PREFIX}${id}`)
    return []
  }
}

export default {
  props: ['socket'],
  data: function () {
    return {
      loaded: false,
      blocks: [],
      chosenSkipchain: this.$route.params.chain,
      getBlockRoster: (index) => {
        // We used to load the roster from the block, but that means that old
        // blocks with old rosters cannot be fetched from servers which are no
        // longer running.  So now just use the newest block we currently know
        // about.
        return this.blocks[this.blocks.length - 1].roster
      },
      getBlockByIndex: (i, shouldNotUpdateBlocks) => {
        const idx = this.blocks.findIndex(b => b.index === i)
        // get the most updated roster
        const socket = new SkipchainRPC(this.getBlockRoster(idx))

        return socket.getSkipBlockByIndex(hex2Bytes(this.$route.params.chain), i).then((reply) => {
          const { skipblock } = reply

          if (!shouldNotUpdateBlocks) {
            this.blocks.splice(i, 1, { ...skipblock, loaded: true })
          }
          return skipblock
        })
      },
      getBlockByHash: (hex, shouldNotUpdateBlocks) => {
        const hash = hex2Bytes(hex)
        const idx = this.blocks.findIndex(b => b.hash && b.hash.equals(hash))
        // get the most updated roster
        const socket = new SkipchainRPC(this.getBlockRoster(idx))

        return socket.getSkipBlock(hash).then((block) => {
          if (!shouldNotUpdateBlocks) {
            this.blocks.splice(block.index, 1, { ...block, loaded: true })
          }
          return block
        })
      }
    }
  },
  mounted: function () {
    /* the if case stands for when the component is mounted for the first time it might take chosenSkipchain
      as the empty string. So we want mounted to be called only when chosenSkipchain exists */
    if (!this.chosenSkipchain) return

    this.blocks = []
    try {
      this.blocks = loadBlocks(this.chosenSkipchain)
    } catch (e) {
      // key not set, ignoring the error
    }

    // Refetch the full update to take potential new forward-links and then get the
    // shortest existing proof of the chain.
    this.socket.getUpdateChain(hex2Bytes(this.chosenSkipchain), false).then(
      (update) => {
        // update has always at least the latest known block if the
        // request is a success
        const newBlocks = new Array(update[update.length - 1].index + 1)
        // fill only the updates
        for (let i = update[0].index; i < newBlocks.length; i++) {
          if (update[0] && update[0].index === i) {
            newBlocks[i] = { loaded: true, ...update.shift() }
          } else {
            newBlocks[i] = { loaded: false, index: i, height: 1 }
          }
        }

        this.blocks = newBlocks
        storeBlocks(this.chosenSkipchain, this.blocks)
        this.loaded = true
      },
      (e) => {
        console.error(e)
        // TODO: do something with the error
      }
    )
  }
}
</script>

<style lang="css">
</style>
