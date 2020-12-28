import React, { useState } from 'react';
import { StyledInput, StyledLabel, StyledSelect } from './UI/Input.styled';
import { PERIODS, PERIOD_MESSAGES } from '../constants/spotify';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }

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

  const periodOptions = Object.keys(PERIODS).map((periodKey) => {
    const periodMessage = PERIOD_MESSAGES[PERIODS[periodKey]];
    const label =
      periodMessage.charAt(0).toUpperCase() + periodMessage.slice(1);
    return (
      <option key={periodKey} value={PERIODS[periodKey]}>
        {label}
      </option>
    );
  });

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
        {periodOptions}
      </StyledSelect>
    </Wrapper>
  );
}
