export function CalculateRisk(currentValue, loanAmount) {
    let risk = loanAmount / currentValue;
    if (risk > 0.5) risk = risk + 0.1;
    return (risk);
}