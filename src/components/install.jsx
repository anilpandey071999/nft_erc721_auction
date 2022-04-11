import {Header} from 'semantic-ui-react'

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
      padding: '1em 0em',
    },
    last: {
      marginBottom: '300px',
    },
    center: {
      textAlign: 'center',
    }
}
const Install = () => {
    return (
        <div>
             <Header as='h3' content='Follow the link to install' style={style.h3} textAlign='center'/>
             <Header as='h3' style={style.center}>
               <a href="https://metamask.io/download.html" >Meta Mask</a>
            </Header>
        </div>
    );
};

export default Install;