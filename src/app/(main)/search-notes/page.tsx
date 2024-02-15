import React from 'react';
import SearchNotesHeader from '@/components/domains/notes/SearchNotesHeader';
import Container from '@/components/commons/Container/Container';
import SearchNotesResult from '@/components/domains/notes/SearchNotesResult';

type SearchNotesPageProps = {}

const SearchNotesPage = ({}: SearchNotesPageProps) => {
  return (
    <Container>
      <SearchNotesHeader />
      <SearchNotesResult />
    </Container>
  );
};

export default SearchNotesPage;
