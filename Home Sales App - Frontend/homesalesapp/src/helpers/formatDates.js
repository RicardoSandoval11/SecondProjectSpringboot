
export const formatDates = (date) => {

    const newDate = new Date(date).toISOString().slice(0,10);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return new Date(newDate).toLocaleDateString('en-US', options);
}