import React, {useState} from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Confirmation() {
  const [user, returnUser] = useState(0)
  const [checked, userChecked] = useState(0)
  const token = useParams().token
  //let user = false;
  console.log(token)
  console.log("user" + user)
  !user && Axios.post("http://localhost:3005/verify_user", {
          token:token
        }).then(data => { console.log(data.data)
          console.log(data.data[0])
          if(data.data[0]){
            returnUser(1)
          }
          
          userChecked(1)
      }
  )

  return user ? <div>yes</div> : <div>no</div>

}
