import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
/**
 * component for the search bar in the topnav
 */
export class SearchBarComponent implements OnInit {
  /**
   * represents the contents of the searchbar -- the tag to be searched by
   */
  tagName:String="";
  /**
   * Constructor for the SearchBarComponent
   * @param router the router object - used to redirect the user to the search results page when form is submitted
   */
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  /**
   * returns immediately if form isn't properly filled out -- otherwise redirects the user to the search results page
   * @param form - represents the search bar form
   */
  onSubmitClick(form:any){
    if(form.status === "INVALID") return;
    if(this.tagName==="") return;
    //console.log(this.tagName)
    this.router.navigateByUrl('/search?tagName='+this.tagName);
  }

}
