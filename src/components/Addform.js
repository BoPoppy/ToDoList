import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

export default function UncontrolledAlertFadelessExample() {
  return (
    <div>
      <UncontrolledAlert color="warning" fade={false}>
        I am an alert and I can be dismissed without animating!
      </UncontrolledAlert>
    </div>
  );
}