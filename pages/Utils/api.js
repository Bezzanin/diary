  const articles = []
 
    fetch('https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=8dc245ee80ae4aeeb28415c4375ff641')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          articles: responseJson.articles,
        });
      })
      .done();

      export const NEWS = [articles]