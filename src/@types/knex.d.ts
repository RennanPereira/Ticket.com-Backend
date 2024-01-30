declare module 'knex/types/tables' {
  export interface tables {
    movies: {
      id: string
      titulo: string
      genero: string
      sinopse: string
      classificacao_etaria: string
      duracao: string
      nome_original: string
      direcao: string
      distribuicao: string
      pais_de_origem: string
      nota_imdb: string
      nota_rotten_tomatoes: string
      em_cartaz: string
      em_breve: string
    }

    regions: {
      id: string
      estado: string
      cidade: string
    }

    cinemas: {
      id: string
      nome_do_cinema: string
      endereco: string
      estado: string
      cidade: string
    }
  }
}
