import React, { useState } from 'react';
import { StyledInput, StyledLabel, StyledSelect } from './UI/Input.styled';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  ${StyledLabel},
  ${StyledSelect} {
    margin: 0.5rem 0.5rem 0 0;
  }
`;

export default function TopRankingButtons({
  defaultPeriod,
  defaultLimit,
  onChange,
}) {
  const [period, setPeriod] = useState(defaultPeriod);
  const [limit, setLimit] = useState(defaultLimit);
  const [minLimit, maxLimit] = [3, 50];

  const handleLimitChange = (e) => {
    let value = e.target.value || minLimit;

    if (value < minLimit) {
      value = minLimit;
    }
    if (value > maxLimit) {
      value = maxLimit;
    }
    setLimit(value);
    onChange({ limit: value, period });
  };

  const handlePeriodChange = (e) => {
    const value = e.target.value;
    setPeriod(value);
    onChange({ limit, period: value });
  };

  return (
    <Wrapper>
      <StyledLabel>
        Show {''}
        <StyledInput
          min={minLimit}
          max={maxLimit}
          type="number"
          value={limit}
          onChange={handleLimitChange}
        />
      </StyledLabel>
      <StyledSelect value={period} onChange={handlePeriodChange}>
        <option value="short_term">Last month</option>
        <option value="medium_term">Last 6 months</option>
        <option value="long_term">Lifetime</option>
      </StyledSelect>
    </Wrapper>
  );
}
