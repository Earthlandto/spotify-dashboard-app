import styled from 'styled-components';

const BaseInput = styled.input`
  height: 2rem;
  min-width: 3.5rem;

  margin: 0;
  padding: 0.25rem 0.25rem 0.25rem 0.5rem;

  border: 1px solid #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.1;
  outline: none;
  background-color: white;

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
