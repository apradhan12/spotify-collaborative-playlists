import { Component } from 'react'


interface Props {
  match: {
    params: { 
        playlistId: string
    }
  }
}

export default class RequestsPage extends Component<Props> {
  render() {
    return 'REQUESTS PAGE FOR PLAYLIST ID: ' + this.props.match.params.playlistId
  }
}
