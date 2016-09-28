import Relay from 'react-relay'

export default class ChangeTodoStatusMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        id,
        rev,
        complete,
        text,
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  }
  getMutation () {
    return Relay.QL`mutation{upsertTodo}`
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpsertTodoPayload {
        todo {
          complete,
        },
        viewer {
          allTodos,
        },
      }
    `
  }
  getConfigs () {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id,
        viewer: this.props.viewer.id,
      },
    }]
  }
  getVariables () {
    return {
      complete: this.props.complete,
      id: this.props.todo.id,
      rev: this.props.todo.rev,
      text: this.props.todo.text,
    }
  }
  getOptimisticResponse () {
    var viewerPayload = {id: this.props.viewer.id}
    return {
      todo: {
        complete: this.props.complete,
        id: this.props.todo.id,
        rev: this.props.todo.rev,
        text: this.props.todo.text,
      },
      viewer: viewerPayload,
    }
  }
}
