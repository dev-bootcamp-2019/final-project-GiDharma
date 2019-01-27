import { Connect } from 'uport-connect'

export let uport = new Connect('BountyBox')
export const web3 = uport.getWeb3()
