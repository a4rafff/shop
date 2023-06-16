import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit  {

  title='pagination'
 
  page:number=1;
  count:number=0;
  tableSize:number=6;
  tableSizes:any=[5,10,15,20];


  toggle:boolean=false;  



  product:any=[];
  errorMessage:any;
  uniqueItems:any;
  categories:any=[]
  

  constructor(private elementRef: ElementRef, private renderer: Renderer2,private ProductsService:ProductsService,private activatedRoute: ActivatedRoute, public  router:Router , private http: HttpClient){ }

 
  ngOnInit(): void{
 



    this.getAllproduct()
 

    
  }


      getAllproduct(): void{
        this.ProductsService.getAllproducts().subscribe({
          next:(data:any)=>{
            this.product=data
             
            this.categories= Array.from(new Set(this.product.map((product: any) => product.category)));
           

          },error:error=>this.errorMessage=error
        })

      }
 
      goCategorie(categorie:any){
        this.router.navigate(["categorie/",categorie],{relativeTo:this.activatedRoute})
         
      }


      

      goToproductID(id:any){
        this.router.navigate(["/LazyLoading/Shop",id])
      }
      getAllCategories(){
        this.router.navigate(["/LazyLoading/Shop"])
         
      }

        onTableDataChange(event:any){
          this.page=event;
          this.getAllproduct();
        }
 




        toggleSidebar() {
          this.toggle=!this.toggle;
          const sidebar = this.elementRef.nativeElement.querySelector('#sidebar');
          if (this.toggle){
            this.renderer.addClass(sidebar, 'active');
          }
          else {this.renderer.removeClass(sidebar, 'active');}
          console.log('Work');
        }
      
      
}
