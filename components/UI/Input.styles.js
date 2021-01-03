import styled from 'styled-components';
import { rgba } from 'polished';

const BaseInput = styled.input`
  height: 2rem;
  min-width: 3.5rem;

  margin: 0;
  padding: 0.25rem 0.25rem 0.25rem 0.5rem;

  color: inherit;
  background-color: ${rgba('#ececec', 0.15)};
  border: 1px solid ${rgba('#333', 0.5)};
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.1;
  outline: none;

  &:focus,
  &:visited,
  &:active,
  &:hover {
    border-color: ${rgba('#ececec', 0.5)};
  }
`;

export const StyledInput = styled(BaseInput)``;

export const StyledLabel = styled.label`
  display: block;
  font-size: 0.875rem;
`;

export const StyledSelect = styled(BaseInput).attrs(() => ({
  as: 'select',
}))`
  font-size: 0.875rem;
`;
