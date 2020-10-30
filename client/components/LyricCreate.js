import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { content: '' };
    }

    onSubmit(e) {
        e.preventDefault();


        this.props.mutate({
            variables: { 
                content: this.state.content,
                songId: this.props.songId
             },
            //refetchQueries: [{ query }] *used catching with dataIdFromObject in index.js*
        }).then(() => this.setState({ content: ''}));

        //() => this.setState({ content: ''}) "setting state to empty outside the mutate immediately clears input field on submit"
    }

    render() {
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input value={this.state.content} onChange={(e) => this.setState({ content: e.target.value }) } />
            </form>
        );
    }

}

const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`;


export default graphql(mutation) (LyricCreate);
