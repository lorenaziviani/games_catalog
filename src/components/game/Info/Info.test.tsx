import { render, screen } from '@testing-library/react'
import Info from './index'

describe('Info Component', () => {
  it('deve renderizar a data de lançamento', () => {
    render(<Info released="2023-01-15" playtime={20} />)

    expect(screen.getByText(/15\/01\/2023|14\/01\/2023/)).toBeInTheDocument()
  })

  it('deve renderizar o tempo de jogo', () => {
    render(<Info released="2023-01-15" playtime={20} />)

    expect(screen.getByText('20h')).toBeInTheDocument()
  })

  it('deve renderizar data e tempo de jogo juntos', () => {
    render(<Info released="2023-01-15" playtime={20} />)

    expect(screen.getByText(/15\/01\/2023|14\/01\/2023/)).toBeInTheDocument()
    expect(screen.getByText('20h')).toBeInTheDocument()
  })

  it('não deve renderizar tempo de jogo quando showPlaytime é false', () => {
    render(<Info released="2023-01-15" playtime={20} showPlaytime={false} />)

    expect(screen.getByText(/15\/01\/2023|14\/01\/2023/)).toBeInTheDocument()
    expect(screen.queryByText('20h')).not.toBeInTheDocument()
  })

  it('deve renderizar tempo de jogo quando showPlaytime é true', () => {
    render(<Info released="2023-01-15" playtime={20} showPlaytime={true} />)

    expect(screen.getByText(/15\/01\/2023|14\/01\/2023/)).toBeInTheDocument()
    expect(screen.getByText('20h')).toBeInTheDocument()
  })

  it('deve renderizar tempo de jogo por padrão', () => {
    render(<Info released="2023-01-15" playtime={20} />)

    expect(screen.getByText('20h')).toBeInTheDocument()
  })

  it('deve formatar datas diferentes corretamente', () => {
    const { rerender } = render(<Info released="2022-12-25" playtime={10} />)
    expect(screen.getByText(/25\/12\/2022|24\/12\/2022/)).toBeInTheDocument()

    rerender(<Info released="2021-06-10" playtime={15} />)
    expect(screen.getByText(/10\/06\/2021|09\/06\/2021/)).toBeInTheDocument()

    rerender(<Info released="2020-03-05" playtime={30} />)
    expect(screen.getByText(/05\/03\/2020|04\/03\/2020/)).toBeInTheDocument()
  })

  it('deve renderizar diferentes tempos de jogo', () => {
    const { rerender } = render(<Info released="2023-01-15" playtime={5} />)
    expect(screen.getByText('5h')).toBeInTheDocument()

    rerender(<Info released="2023-01-15" playtime={100} />)
    expect(screen.getByText('100h')).toBeInTheDocument()

    rerender(<Info released="2023-01-15" playtime={0} />)
    expect(screen.getByText('0h')).toBeInTheDocument()
  })

  it('deve lidar com datas inválidas', () => {
    render(<Info released="data-invalida" playtime={20} />)

    expect(screen.getByText('20h')).toBeInTheDocument()
  })
})
