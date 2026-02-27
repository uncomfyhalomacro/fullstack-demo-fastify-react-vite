function isSafeNumber(bigintValue) {
	return (
		bigintValue <= BigInt(Number.MAX_SAFE_INTEGER) &&
		bigintValue >= BigInt(Number.MIN_SAFE_INTEGER)
	);
}

export default isSafeNumber;
