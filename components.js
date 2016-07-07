class ToDoBox extends React.Component{
	constructor(){
		super();
		this.state = {
			list : []
		}
	}
	componentWillMount(){
		this.state.list = JSON.parse(localStorage.items || "[]");
	}
	componentDidUpdate(){
		localStorage.items = JSON.stringify(this.state.list);
	}
	render(){
		const lists = this._fetchList();
		let contentLength = this._getContentLength();
		return(
			<div>
				<ToDoInput addItem={ this._addItem.bind(this) }/>
				<h2>{contentLength}</h2>
				{lists}
			</div>
		)
	}
	_fetchList(){
		return this.state.list.map( (listItem)=> {
			return(
				<ToDoList text={listItem.text}
				 key = {listItem.id} 
				 id ={listItem.id}
				 complete={listItem.complete}
				 changeStatus={this._changeStateItem.bind(this)}/>
				)
		} )
	}
	_changeStateItem(id){
		let newListArr = [];
		this.state.list.map( (listItem)=> {
			//console.log('first'+listItem.id +'last'+id )
			if(listItem.id ==id){
				//console.log('inside'+listItem.complete )
				listItem.complete =!listItem.complete;
			}
			
			newListArr.push(listItem);
			
		});
		//console.log(newListArr)
		this.setState({list:newListArr});
	}
	_addItem(body){

		let newItem = {};
		newItem.id = this.state.list.length+1;
		newItem.text = body;
		newItem.complete = false;
		/* this.setState({
	      comments: this.state.comments.concat([comment])
	    });*/
		this.setState( {list : this.state.list.concat([newItem]) } );
		//this.setState( {list : this.state.list.concat(newItem) } );
		
	}
	_getContentLength(){
		let count=0;

		if(this.state.list.length==0){
			return "currently there are no pending tasks";
		}
		else{
			this.state.list.map( (item)=> {
				if(!item.complete){
					count++;
				}
			} )
		}
		if(count==1){
			return `${count} task is there`;
		}
		else if(count==0){
			return "currently there are no pending tasks";
		}
		else{
			return `${count} tasks are there`;
		}
		console.log(count);
	}
}

class ToDoInput extends React.Component{
	render(){
		return(
			<input className="todo-input" placeholder ="Input ToDo List : " ref={c => this._author = c}  onKeyDown={this.addItem.bind(this)}></input>
		)
	}
	addItem(event){
		if(event.keyCode == 13){
			this.props.addItem(this._author.value);
			this._author.value = '';
		}
	}
}

class ToDoList extends React.Component{
	render(){
		return(
			<h1 id={this.props.id} onClick={this.changeStateItem.bind(this)} className={`${!this.props.complete?'active':'inactive'}`} ref={ d => this.todoitem=d }>{this.props.text}</h1>
		)
	}
	changeStateItem(event){
		this.props.changeStatus(this.todoitem.id);
	}
	
}

ReactDOM.render(<ToDoBox/>,document.getElementById('content'));