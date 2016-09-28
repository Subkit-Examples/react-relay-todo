import Relay from 'react-relay'

export default class AddTodoMutation extends Relay.Mutation {

  static fragments = {
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
        todo,
        todoEdge,
        viewer {
          allTodos
        }
      }
    `
  }

  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'allTodos',
      edgeName: 'todoEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }]
  }

  getVariables () {
    return {
      text: this.props.text,
      complete: false,
    }
  }

  getOptimisticResponse () {
    return {
      todoEdge: {
        node: {
          complete: false,
          text: this.props.text,
        },
      },
      viewer: {
        id: this.props.viewer.id,
      },
    }
  }
}
