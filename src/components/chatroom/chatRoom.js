/* eslint-disable no-console */
import React from 'react';
import ws from 'websocket';
import $ from 'jquery';
import homePage from '../home/homePage';

class chatRoom extends React.Component {
    componentDidMount() {
       
        
       //prompts for user name
       const name = prompt("Whats your name?");
       

       //Starting websocket
       const sock = new WebSocket('ws://127.0.0.1:8888');
       
       const log = document.getElementById('textbox');
       
       sock.onopen = function(message){
           sock.send('/nick '+name);
       };
       

       //websocket on recieving message
        sock.onmessage = function (event) {
            console.log(event.data);
            const json = JSON.parse(event.data);
            const jsonmsg = JSON.parse(json.message);
           
            log.innerHTML += json.from+": "+jsonmsg.data+"<br>";
        };

        //on sending message
        document.querySelector('button').onclick = function() {
            const text= document.getElementById('msg').value;
            sock.send(JSON.stringify({
                type: "msg",
                data: text
            }));
            log.innerHTML += "You :"+text+"<br>";
            $('#msg').empty();
        };


     //Continuous API call to Get/ users API to display online users
     
     (function worker() {
        $.ajax({
            url: 'users',
            dataType: 'json',
            type: 'get',
            cache: false,
          success: function(userdata) {
            $(userdata.data).each(function(index,value){
                const username = (value.nick);
                if(username!=name){
                    
                    $('#onlineusers').append(username+'<br>');

                    setTimeout(function(){ $('#onlineusers').empty();}, 2999);
                    
                }
            });
          },
          complete: function() {
            
            // Schedule the next request when the current one's complete
            setTimeout(worker, 3000);
          }
        });
      })();

      

      //API call to get online usernames in history filter dropdown
      setInterval(function(){ $(function (){
        let useroptions;
        $.getJSON('users',function(result) {
            $(result.data).each(function(index, value) {
                //<option value=''>value.nick</option>
                 useroptions+="<option value=''>"+value.nick+"</option>";
            });
            $('#historyfilter').html(useroptions);
         });
     
    });
   }, 5000);


   //on selecting option from online users
    $('#historyfilter').change(function(){
           const selectedoption = $('#historyfilter option:selected');
           $('#historyfeed').empty();
           
           $.getJSON('history',function(result) {
            $(result.data).each(function(index, value) {
                
                const username = (value.from);

                if(username==selectedoption.text()){
                    const fetchtimestamp = (value.timestamp);
                 //converting timestamp to 24hour clocktime
                    const date    = new Date(fetchtimestamp),
                    hours   = date.getHours(),
                    minutes = date.getMinutes();
                
                const output  = ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2);
                    

                    const msg1 = (JSON.parse(value.msg).data);
                    $('#historyfeed').append('Sent at '+output+': '+msg1+'<br>');
                }else{
                    console.log('none');
                }

            });
         });


    });

    //onclick 'history' button, history section is made visible 

    $("#historyshow").click(function(){
        $(".historysection").css("display", "block");
        $("#historyshow").css("display", "none");
        $(".onlineuserwindow").css("height", "100px");
        
    });

   //onclick 'hide' button, history section is made invisible
    $("#hidehistory").click(function(){
        $(".historysection").css("display", "none");
        $("#historyshow").css("display", "block");
        $(".onlineuserwindow").css("height", "100px");
        
        
    });


    //click sendbutton on pressing enter key
    $("#msg").keyup(function(event){
        if(event.keyCode == 13){
            $("#sendbutton").click();
        }
    });
   
        
    }
      
     render() {
         return (
             <div className="chatroom">
                 <div id="box">              
                  <div id="textbox"> </div>  
                 </div>

                 <div className="commbox">
                 <input type="text" size="35" id="msg" placeholder="Say something..."></input> 
                 <button id="sendbutton">Send</button>
                 </div>
                 
                 <div className="onlineuserwindow">
                     <div className="onlinedot">    
                     </div><p><b>Online</b></p>
                     <div id="onlineusers"></div>
                 </div>        
                 
                 <button id="historyshow">History </button>
                 <div className="historysection">
                     
                     <select id="historyfilter">
                     <option value="allusers">All</option>
                     <option value=""></option>
                     <option value=""></option>

                      </select>   
                      <button id="hidehistory">Hide</button>
                      <div id="historyfeed"></div>
                     </div>
             </div>    
         );
     }
}


export default chatRoom;