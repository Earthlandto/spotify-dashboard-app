import styled from 'styled-components';

const BaseInput = styled.input`
  height: 2rem;
  line-height: 1.1;
  border-radius: 4px;
  padding: 0.25rem 0.25rem 0.25rem 0.5rem;
  margin: 0;
  font-size: 0.875rem;
  outline: none;
  min-width: 3.5rem;
  border: 1px solid #f5f5f5;

  &:focus,
  &:visited,
  &:active,
  &:hover {
    border-color: #ececec;
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
