import React from 'react';
import './OrientationModal.scss';

import {handleKeyboardEvents} from '../../../utils/handleKeyboardEvents';

class OrientationModal extends React.Component {
  componentDidMount() {
    document.onkeydown = (e) => {
      if (this.props.showOrientationModal) {
        handleKeyboardEvents(['escape', this.props.closeModal], ['enter', this.props.closeModal], e);
      };
    };
  };

  render() {
    return (
     <div className = "modal-item-container">

       <div className = "header-modal">
         <div className = "size2">
           You're in! A couple of things to get you started:
         </div>
       </div>

       <div className = "orientation__list">

         <div className = "orientation__item message">
           <b className = "color-accent center">If you are hosting an event:</b><br />
           <ul>
             <li><b>Don't mention your event's actual location</b> unless it is a public place where there will be lots of people. Instead, plan to meet at a nearby public place, like a coffee shop or a grocery store, and go to your event from there.</li>
             <li>Please don't exclude anyone unless it is <b>for someone's safety</b> or <b>to request 'competitive players only' at a competitive game</b>.</li>
             <li>If you have made an exclusion request and someone does not respect it, do not feel obligated to let them join, <b>especially if you feel at all unsafe</b>. If they act inappropriately, involve the police and/or cancel the event. Keep yourself safe!</li>
           </ul>
         </div>

         <div className = "orientation__item message">
          <b className = "color-accent center">If you are joining an event:</b><br />
          <ul>
            <li><b>Please respect exclusions in events.</b> For example, if you are a man, don't join an event marked 'girls only, please', or if you have never played volleyball before, don't join an event marked 'competitive players only, please'.</li>
            <li>When you arrive at an event's meeting place, <b>take a few moments to make sure everything seems legitimate before you identify yourself.</b> If anything seems suspicious or strange, don't get involved.</li>
            <li>When you meet the host, ask where the event will take place and <b>let someone know where you are going to be</b> before you leave.</li>
          </ul>
        </div>

        <div className = "orientation__item message">
          <span>
            <b>Every event you see here will happen within 24 hours.</b> No event can be posted more than 24 hours in advance.
          </span>
        </div>

       </div>

       <div
         className = "button background-none width15"
         onClick = {this.props.closeModal}
       >
         Got it
       </div>
     </div>
   );
  };
};

export { OrientationModal as default };
