import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSongDetail';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import { Link } from 'react-router';

class SongDetail extends Component {
    render() {
        const { song, loading } = this.props.data;

        if(loading) { return <div>Loading...</div>; } //can aslo check with *if(!song)*


        return(
            <div>
                <Link to="/" className="btn">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={this.props.params.id} />
            </div>
        );
    }
}


export default graphql(fetchSong, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);
