import 'buffer'

import { Darc } from '@dedis/cothority/darc'
import { Roster } from '@dedis/cothority/network'
import { ChainConfig } from '@dedis/cothority/byzcoin'
import { Read, Write, LtsInstanceInfo } from '@dedis/cothority/calypso'
import { ProjectData } from '@/proto'
import { PointFactory } from '@dedis/kyber'
import moment from 'moment'
import varint from 'varint'

const toUUID = hex => {
  return hex.slice(0, 8).concat('-').concat(
    hex.slice(8, 12)
  ).concat('-').concat(
    hex.slice(12, 16)
  ).concat('-').concat(
    hex.slice(16, 20)
  ).concat('-').concat(
    hex.slice(20, 32)
  )
}

function bytes2Hex (bytes) {
  if (!bytes) {
    return ''
  }

  return Array.prototype.map.call(bytes, x => ('00' + x.toString(16)).slice(-2)).join('')
}

function hex2Bytes (hex) {
  if (!hex) {
    return Buffer.allocUnsafe(0)
  }

  return Buffer.from(hex, 'hex')
}

function formatArg (name, value) {
  try {
    if (name === 'config.darc' || name === 'darc.darc' || name === 'evolve_unrestricted.darc' || name === 'evolve.darc') {
      const darc = Darc.decode(value)
      return `DARC: ${darc.description.toString()}, rules: ${darc.rules.toString()}`
    }

    if (name === 'config.roster') {
      const r = Roster.decode(value)
      return r.list.map(x => `${x.description} ~ ${x.getWebSocketAddress()}`).join(', ')
    }

    if (name === 'config.block_interval') {
      const i = varint.decode(value)
      return `Value: ${moment.duration(i / 1000000).seconds()} seconds`
    }

    if (name === 'config.max_block_size') {
      const i = varint.decode(value)
      return `Value: ${i} bytes`
    }
    if (name === 'update_config.config') {
      const c = ChainConfig.decode(value)
      return `Value: ${c.toString()}`
    }
    if (name === 'setReady.enclaveURL') {
      const url = new TextDecoder('utf-8').decode(value)
      return `Value: ${url}`
    }
    if (name === 'update.projectData' || name === 'odysseyproject.projectData') {
      const data = JSON.stringify(ProjectData.decode(value))
      return `Value: ${data}`
    }
    if (name === 'calypsoRead.read') {
      const cr = Read.decode(value)
      const p = PointFactory.fromProto(cr.xc)
      return `Value: Requesting read via rencrypt to key ${p.toString()}`
    }
    if (name === 'calypsoWrite.write') {
      const data = Write.decode(value)
      return `Value: Wrote secret data to ${data.extradata}, encrypted with encrypted symmetric key [${bytes2Hex(data.u)}, ${bytes2Hex(data.e)}], using LTS id ${bytes2Hex(data.ltsid)}`
    }
    if (name === 'longTermSecret.lts_instance_info') {
      const li = LtsInstanceInfo.decode(value)
      const r = li.roster.list.map(x => `${x.description} ~ ${x.getWebSocketAddress()}`).join(', ')
      return `Value: Long Term Secret entrusted to roster ${r}`
    }
  } catch (e) {
    // If we fail to format specially, then do nothing; fall thru to default format.
    console.log('failed to format value', bytes2Hex(value), 'err', e)
    return `Value: ${bytes2Hex(value)}`
  }

  // default formatting: hex
  console.log('Default format for name', name)
  return `Value: ${bytes2Hex(value)}`
}

export {
  toUUID,
  bytes2Hex,
  hex2Bytes,
  formatArg
}
