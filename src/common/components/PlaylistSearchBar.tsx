import React, { ChangeEvent, Component } from 'react'
import { Form, FormControl, Table, Button } from 'react-bootstrap';
import { playlistMap } from '../data';


interface Props {
  placeholder: string;
  dark?: boolean; 
}

interface State {
  searchQuery: string;
  selectedPlaylistId: string;
  searchFocused: boolean;
}

export default class PlaylistSearchBar extends Component<Props, State>  {

  constructor(props: Props) {
    super(props);

    this.state = {
      searchQuery: "",
      selectedPlaylistId: "",
      searchFocused: false
    }

    this.updateSearchQuery = this.updateSearchQuery.bind(this);
    this.navigateToSelectedPlaylist = this.navigateToSelectedPlaylist.bind(this);
  }

  updateSearchQuery(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
        searchQuery: event.target.value
    });
  }
  
  navigateToSelectedPlaylist() {
    if (this.state.selectedPlaylistId) {
      window.location.href = `#/playlist/${this.state.selectedPlaylistId}`
      this.setState({
        searchQuery: "",
        selectedPlaylistId: "",
      })
    }
   
  }

  render() {
    return (
      <Form className="d-flex mx-3" style={{width: "305px"}} onFocus={() => {this.setState({})}}>
        <FormControl
                autoFocus
                style={{borderRadius: "5px 0px 0px 5px", borderColor: this.props.dark ? "black" : "white"}}
                placeholder={this.props.placeholder}
                value={this.state.searchQuery}
                onChange={this.updateSearchQuery}
            />
            {
                (this.state.searchQuery && (!this.state.selectedPlaylistId || this.state.searchFocused)) ?
                    (
                        <Table className="w-auto" style={{position: "fixed", backgroundColor: "white", marginTop: "35px", zIndex: 1000, border: "lightgray 2px solid", borderRadius: "0px 0px 5px 5px"}}>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Creator</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                Array.from(Object.entries(playlistMap))
                                    .filter(([_, playlist]) =>
                                        playlist.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
                                    .map(([_, playlist]) => (
                                        <tr className="dropdown-item"
                                            role="button"
                                            style={{display: "table-row"}}
                                            onClick={() => { this.setState({selectedPlaylistId: playlist.id, searchFocused: false, searchQuery: playlist.title}); }}
                                        >
                                            <td>{playlist.title}</td>
                                            <td>{playlist.creator}</td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    )
                    : ""
            }
        <Button onClick={this.navigateToSelectedPlaylist} variant={this.props.dark ? "outline-dark" : "outline-light"} style={{borderRadius: "0px 5px 5px 0px", borderLeft: "none", height: "98%"}}>Search</Button>
    </Form>
    )
  }
}
