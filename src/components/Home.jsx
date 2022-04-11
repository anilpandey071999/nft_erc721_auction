import React from 'react'
// import 'semantic-ui-css/semantic.min.css'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Image,
    Item,
    Label,
    Menu,
    Segment,
    Step,
    Table,
  } from 'semantic-ui-react'
const style = {
    h1: {
      marginTop: '3em',
    },
    h2: {
      margin: '4em 0em 2em',
    },
    h3: {
      marginTop: '2em',
      textAlign: 'center',
      padding: '2em 0em',
    },
    last: {
      marginBottom: '300px',
    },
}

function Home() {
    return(
        <div>
          <Header as='h3' content='HEMO PAGE BITCH!!!' style={style.h3} textAlign='center' />
        </div>
    )
}

export default Home;
