import { compareDesc } from 'date-fns';

const sortDates = meditations => {
  return meditations.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
};

export default sortDates;