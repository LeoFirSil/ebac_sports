import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { useGetFavoritosQuery, useGetProdutosQuery } from '../services/api'

import * as S from './styles'

const ProdutosComponent = () => {
  const { data: Produtos, isLoading: produtosLoading } = useGetProdutosQuery()
  const { data: Favoritos, isLoading: favoritosLoading } =
    useGetFavoritosQuery()

  if (produtosLoading || favoritosLoading) return <h2>Carregando...</h2>

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    if (!Favoritos) return false

    const produtoId = produto.id
    const IdsDosFavoritos = Favoritos?.map((f) => f.id)

    return IdsDosFavoritos.includes(produtoId)
  }

  return (
    <>
      <S.Produtos>
        {Produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
