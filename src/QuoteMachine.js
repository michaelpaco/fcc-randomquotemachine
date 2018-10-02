import React, { Component, Fragment } from 'react';

class QuoteMachine extends Component {
  constructor() {
    super();
    this.state = {
      quote: {
        content: '',
        title: ''
      },
      hasQuote: false
    }
    this.END_POINT = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
  }

  getRandomQuote = () => {
    fetch(this.END_POINT, {cache: "no-store"})
      .then(response => response.json())
      .then(data => {
        if (data[0].content && data[0].title && data[0].link) {
          let { quote } = this.state;
          let quoteData = data[0];
          quote.content = quoteData.content;
          quote.title = quoteData.title;

          this.setState({ quote, hasQuote:true });           
        }
        else {
          return console.error('No quote has been found 404')
        }
      }).catch((error) => console.log)
  }

  renderQuote = () => {
    const { title, content } = this.state.quote;
    return (
      <div id='quote-text'>
        <h4 id='text' dangerouslySetInnerHTML={{__html:content}}></h4>
        <h6 id='author'>-{title}</h6>
    </div>
    )
  }

  render() {
    const { hasQuote } = this.state;
    return (
  <Fragment>
        <div id='quote-box'>
          <br />
          <br />
          <h1>Quote Machine</h1>
          <br />
          {hasQuote === true ?
          this.renderQuote() : 'No wisdom until you click me!'}
          <br />
          <br />
          <button id='new-quote' onClick={this.getRandomQuote}>Click for Wisdom</button>
          <br />
          <br />
          <a id="tweet-quote" target='_blank' 
  href={"https://twitter.com/intent/tweet?text=Copia e cola a citação aqui, anjo."}>
Tweet this wisdom!</a>
        </div>
      </Fragment>
    );
  }
}

export default QuoteMachine;