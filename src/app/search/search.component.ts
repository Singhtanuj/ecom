import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../app-assets/services/product.service';
import { AddProd } from '../app-assets/interface/data';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  infoIcon = faInfoCircle;

  fetchedResult: undefined | AddProd[]
  constructor( private activatedRoute:ActivatedRoute, private productService:ProductService) { }

  ngOnInit(): void {
    let searchResult = this.activatedRoute.snapshot.paramMap.get('query');
    // console.log("serched Result", searchResult);
    if(searchResult){
      this.productService.getSearchProd(searchResult).subscribe((data)=>{
        this.fetchedResult = data;
      })
    }
    
  }

}
