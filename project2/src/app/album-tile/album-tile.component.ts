import { AlbumComment } from './../models/AlbumComment';
import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../models/album';

@Component({
  selector: 'app-album-tile',
  templateUrl: './album-tile.component.html',
  styleUrls: ['./album-tile.component.css']
})
/**
 * component for displaying an album in a list
 */
export class AlbumTileComponent implements OnInit {

  /**
   * the album to be displayed -- retrieved from the parent object
   */
  @Input()
  album!: Album;
  constructor() { }

  ngOnInit(): void {
  }

  
  
  
  
}
