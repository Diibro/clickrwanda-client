import { Container } from "@mui/material"
import Categories from '../components/dynamic/Categories';

const CategoriesPage = () => {
  return (
    <Container>
      <Categories limit={0} />
    </Container>
  )
}



export default CategoriesPage