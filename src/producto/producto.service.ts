import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoEntity } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private productoRepository: Repository<ProductoEntity>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<ProductoEntity> {
    const existe = await this.productoRepository.findOneBy({
      codigo: createProductoDto.codigo.trim(),
      idCategoria: createProductoDto.idCategoria,
      idUnidad: createProductoDto.idUnidad

    });

    if (existe) {
      throw new ConflictException(
        `El producto ${createProductoDto.codigo} ya existe para la categoria.`,
      );
    }

    return this.productoRepository.save({
      idCategoria: createProductoDto.idCategoria,
      codigo: createProductoDto.codigo.trim(),
      descripcion: createProductoDto.descripcion.trim(),
      idUnidad: createProductoDto.idUnidad,
      precio: createProductoDto.precio,
      existenciaProducto: createProductoDto.existenciaProducto,
      urlImagen: createProductoDto.urlImagen.trim(),
    });
  }

  async findAll(): Promise<ProductoEntity[]> {
    return this.productoRepository.find({ relations: { categoria: true ,unidad:true} }); 
  }

  async findOne(id: number): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne({ where: {id}, relations: {categoria: true, unidad:true}});

    if (!producto) {
      throw new NotFoundException(`El producto ${id} no existe.`);
    }

    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoRepository.findOneBy({id});

    if (!producto) {
      throw new NotFoundException(`El producto ${id} no existe.`);
    }

    const productoUpdate = Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(productoUpdate);
  }

  async remove(id: number) {
    const existe = await this.productoRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El producto ${id} no existe.`);
    }

    return this.productoRepository.delete(id);
  }
}
