import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { FormattedMessage } from 'react-intl';

import StyledButton from '../StyledButton';

class ApproveExpenseBtn extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    approveExpense: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    const { id } = this.props;
    await this.props.approveExpense(id);
    await this.props.refetch();
  }

  render() {
    return (
      <div className="ApproveExpenseBtn" data-cy="approve-expense-btn">
        <StyledButton className="approve" mr={2} buttonStyle="primary" onClick={this.onClick}>
          <FormattedMessage id="expense.approve.btn" defaultMessage="Approve" />
        </StyledButton>
      </div>
    );
  }
}

const approveExpenseQuery = gql`
  mutation approveExpense($id: Int!) {
    approveExpense(id: $id) {
      id
      status
    }
  }
`;

const addMutation = graphql(approveExpenseQuery, {
  props: ({ mutate }) => ({
    approveExpense: async id => {
      return await mutate({ variables: { id } });
    },
  }),
});

export default addMutation(ApproveExpenseBtn);
