import React from 'react';
import axios from 'axios'

import { Button, Card } from 'antd';
import CustomForm from '../components/Form'

    
class ArticleDetail extends React.Component{
    state = {
        article: {}
    }
    componentDidMount(){
        const articleID = this.props.match.params.articleID
        axios.get(`http://127.0.0.1:8000/api/${articleID}`)
            .then(res =>{
                this.setState({
                    article: res.data
                });
                
            }
                  
        )
        
    }
    
    myDeleteHandler = (event) => {
        const articleID = this.props.match.params.articleID
        axios.delete(`http://127.0.0.1:8000/api/${articleID}`);
        this.props.history.push('/');

    }
    render(){
        return(
            <div>
           <Card title={this.state.article.title}>
               <p>{this.state.article.description}</p>
               <p>{this.state.article.content}</p>
           </Card>
           <CustomForm 
                requestType="put"
                articleID={this.props.match.params.articleID}
                btnTxt="Update" />
            <form onSubmit={(ev) => this.myDeleteHandler(ev)}>
                <Button type="danger" htmlType="submit"> Delete</Button>
            </form>
           </div>
        )
        }

        
}
export default ArticleDetail;
