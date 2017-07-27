import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "./../user"
import { Bucket } from "./../bucket"
import { UserService } from "./../user.service"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // studentChange = new EventEmitter
  bucket_list: Array<Bucket>
  current_user: User
  new_user_to_update: User
  user_list: Array<User>
  new_bucket_item: Bucket
  id_for_new_bucket_item: String
  // question_result: Array<string>
  constructor(private user_service: UserService, private router: Router) {}

  ngOnInit() {
    this.current_user = new User
    this.new_bucket_item = new Bucket
    this.new_user_to_update = new User
    // this.current_user.name = "Anonymous"
    // this.question_result = ["","",""]

    this.user_service.get_all_users()
    .then(data => {
      this.user_list = data
      console.log(this.user_list)
    })
    .catch(err => console.log(err))

    this.user_service.get_logged_in_user()
    .then(data => {
      if(data) {
        this.current_user = data
        console.log(this.current_user)
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


  }

  add_bucket_item() {
    console.log(this.new_bucket_item)
    this.new_bucket_item.createdBy = this.current_user.name
    // ADD NEW BUCKET ITEM TO BUCKET LIST
    this.user_service.add_bucket_item(this.new_bucket_item)
      .then(() => {
          console.log("sending new bucket item to server")
          console.log(this.new_bucket_item.title)
          // THEN GET THE BUCKET LIST
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
          // AND GET BUCKET ITEM BY TITLE SO YOU CAN GET ASSIGNED ID FOR BUCKET ITEM
          this.user_service.get_bucket_item_by_title(this.new_bucket_item.title)
            .then(data => {
              if(data) {
                this.id_for_new_bucket_item = data._id
                console.log("id for bucket item",this.id_for_new_bucket_item)
                console.log(this.current_user.bucket_ids)
                this.current_user.bucket_ids.push(this.id_for_new_bucket_item)
                console.log(this.current_user)
                // THEN PASS UPDATED LIST OF BUCKET ITEM IDS FOR USER INTO DB
                this.user_service.update_user(this.current_user)
                  .then(() => {
                    console.log("update user request to server")
                    console.log(this.current_user)
                    console.log(this.new_user_to_update.name)
                    if (this.new_user_to_update.name !== this.current_user.name) {
                      // THEN GET ANOTHER USER FROM DB IF SELECTED TO BE UPDATED TOO
                      this.user_service.get_user_by_name(this.new_user_to_update)
                      .then(data => {
                        if(data) {
                          this.new_user_to_update = data
                          console.log(this.new_user_to_update)
                          this.new_user_to_update.bucket_ids.push(this.id_for_new_bucket_item)
                          // THEN UPDATE THAT OTHER USER
                          this.user_service.update_user(this.new_user_to_update)
                            .then(() => {
                              console.log("update other user request to server")
                              console.log(this.new_user_to_update)
                            })
                            .catch(err => console.log(err))
                        } else {
                            // this.router.navigate(["/login"])
                          console.log("no other user to update")
                        }
                      })
                      .catch(err => console.log(err))
                    }
                  })
                  .catch(err => console.log(err))
              } else {
                console.log("failed to get bucket item from DB")
                // this.router.navigate(["/"])
              }
            })
            .catch(err => console.log(err))
          this.new_bucket_item = new Bucket
          })
      .catch(err => console.log(err))
  }


}
