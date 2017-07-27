import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "./../user"
import { Bucket } from "./../bucket"
import { UserService } from "./../user.service"

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  bucket_list: Array<Bucket>
  user_to_list: User
  user_id: String


  constructor(private _route: ActivatedRoute, private user_service: UserService, private router: Router) {
    this._route.params.subscribe((param)=>{
      console.log("loaded url... id given is: ", param.user_id);
      this.user_id = param.user_id
    })
  }

  ngOnInit() {
    console.log("Here is the user_id to send:" + this.user_id)
    this.user_service.get_user_by_id(this.user_id)
      .then(data => {
        if(data) {
          this.user_to_list = data
          
          console.log(this.user_to_list)
        } else {
          this.router.navigate(["/login"])
        }
      })
      .catch(err => console.log(err))

    this.user_service.get_bucket_list()
      .then(data => {
        if(data) {
          this.bucket_list = data
        } else {
            // this.router.navigate(["/"])
          console.log("failed to get bucket list")
        }
      })
      .catch(err => console.log(err))




    // this.current_user.name = "Anonymous"
    // this.question_result = ["","",""]


    // this.user_service.get_logged_in_user()
    // .then(data => {
    //   if(data) {
    //     this.current_user = data
    //     console.log(this.current_user)
    //   } else {
    //     this.router.navigate(["/login"])
    //   }
    // })
    // .catch(err => console.log(err))
    //
    //   this.user_service.get_bucket_list()
    //     .then(data => {
    //       if(data) {
    //         this.bucket_list = data
    //       } else {
    //           // this.router.navigate(["/"])
    //         console.log("failed to get bucket list")
    //       }
    //     })
    //     .catch(err => console.log(err))


  }

}
