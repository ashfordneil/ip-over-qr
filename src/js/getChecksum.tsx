const getChecksum = (input: { length?: number }) => {
    return input.length
        ? input.length.toString()
        : 'no length';
}

export default getChecksum;