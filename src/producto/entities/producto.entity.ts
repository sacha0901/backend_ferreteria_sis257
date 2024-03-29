import { CategoriaEntity } from "src/categoria/entities/categoria.entity";
import { DetalleEntity } from "src/detalle/entities/detalle.entity";
import { UnidadEntity } from "src/unidad/entities/unidad.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('productos')
export class ProductoEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_categoria' })
  idCategoria: number;

  @Column({length: 10})
  codigo: string;

  @Column({length: 30})
  descripcion: string;

  @Column({ name: 'id_unidad' })
  idUnidad: number;

  @Column()
  precio: number;


  @Column({ name: 'existencia_producto' })
  existenciaProducto: number;

  @Column({ name: 'url_imagen', length: 5000 })
  urlImagen: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @ManyToOne(() => CategoriaEntity, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: CategoriaEntity;

  @ManyToOne(() => UnidadEntity, (unidad) => unidad.productos)
  @JoinColumn({ name: 'id_unidad', referencedColumnName: 'id' })
  unidad: UnidadEntity;

  @OneToMany(() => DetalleEntity, detalle => detalle.producto)
  detalles: DetalleEntity[];
}
