import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
	constructor(props) {
     super(props);
 
     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });
 
     this.state = {
       album: album,
       currentSong: album.songs[0],
       isPlaying: false,
       isHovered: false,
       hoveredIndex: false
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;

   }

   play() {
   	this.audioElement.play();
   	this.setState({isPlaying: true});
   }

   pause() {
   	this.audioElement.pause();
   	this.setState({isPlaying: false});
   }

   setSong(song) {
   	this.audioElement.src = song.audioSrc;
   	this.setState({ currentSong: song});
   }

   handleSongClick(song) {
   	const isSameSong = this.state.currentSong === song;
   	if (this.state.isPlaying && isSameSong) {
   		this.pause();
   	} else {
   		if (!isSameSong) { this.setSong(song);}
   		this.play();
   	}
   }

   onMouseEnter(index){
    this.setState({isHovered: index});
  }

  onMouseLeave(){
    this.setState({isHovered: null});
  }

   render() {

   	  handleHoverButton() {
  	  	const isHovered = this.state.isHovered;
   		let button;
   	  	if (!this.state.isPlaying === this.state.currentSong) {
           	  button= <span className="ion-play"></span>;
            } else if (this.state.currentSong === this.state.isPlaying) {
              button= <span className="ion-pause"></span>;
            } else if (!this.state.isPlaying && this.state.isHovered) {
              button= <span className="ion-play"></span>;
            } else {
              button= <span></span>;
            }
}

     return (
       <section className="album">
           <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
           <div className="album-details">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
       	  </section>

	       <table id="song-list">
	           <col id="song-number-column" />
	        	<colgroup>
	             <col id="song-title-column" />
	             <col id="song-duration-column" />
	           </colgroup>  
	           

	        <tbody>	   
	           {this.state.album.songs.map( (song, index) => 
		            <tr className="song" key={index} onClick= {() => this.handleSongClick(song)} onMouseEnter= {() => this.onMouseEnter(index)} onMouseLeave= {() => this.onMouseLeave()}> 
	             	<td className="song-number"> {index + 1} {handleHoverButton} </td> 
	             	<td className="song-title"> {song.title} </td>
	             	<td className="song-duration"> {song.duration} seconds </td>
	             	</tr>	
	          )}	
		     </tbody>	

	        </table>

       </section>
     );
   }
 }

export default Album;