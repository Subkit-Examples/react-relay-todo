import Relay from 'react-relay'

export default class RenameTodoMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        id,
        rev,
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
          rev,
          text,
        }
      }
    `
  }
  getConfigs () {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id,
      },
    }]
  }

  getVariables () {
    return {
      text: this.props.text,
      id: this.props.todo.id,
      rev: this.props.todo.rev,
      complete: this.props.todo.complete,
    }
  }

  getOptimisticResponse () {
    return {
      todo: {
        id: this.props.todo.id,
        text: this.props.text,
      },
    }
  }
}
