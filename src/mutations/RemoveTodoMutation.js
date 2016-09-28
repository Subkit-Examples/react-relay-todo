import Relay from 'react-relay'

export default class RemoveTodoMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        complete,
        id,
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  }
  getMutation () {
    return Relay.QL`mutation{deleteTodo}`
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteTodoPayload {
        todo {
          id
        },
        viewer {
          allTodos
        }
      }
    `
  }
  getConfigs () {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'allTodos',
      deletedIDFieldName: 'deletedTodoId',
    }]
  }
  getVariables () {
    return {
      id: this.props.todo.id,
      rev: this.props.todo.rev,
    }
  }
  getOptimisticResponse () {
    return {
      deletedTodoId: this.props.todo.id,
      todo: { id: this.props.todo.id },
      viewer: {id: this.props.viewer.id},
    }
  }
}
