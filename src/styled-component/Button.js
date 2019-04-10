import styled, {css} from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  :disabled {
    opacity: 0.4;
  }

  ${props => 
      props.result && 
        css`
          border: steelblue;
          background: steelblue;
          color: white;
        `
  }
`
export default Button;