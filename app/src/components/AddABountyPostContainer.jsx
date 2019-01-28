import AddABountyPost from './AddABountyPost'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
  }
}

const AddABountyPostContainer = drizzleConnect(AddABountyPost, mapStateToProps);

export default AddABountyPostContainer