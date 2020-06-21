import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterProviderFieldToProviderId1592450846972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('appointments', 'provider');
		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'provider_id',
				type: 'uuid',
				isNullable: true,
			})
		);

		await queryRunner.createForeignKey(
			'appointments',
			new TableForeignKey({
				name: 'AppointmentProvider',
				columnNames: ['provider_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'SET NULL', //seta o provider_id dos appointments como null caso user seja deletado
				onUpdate: 'CASCADE'  //caso id do user seja alterado, todos os seus appointments tbm tem provider_id alterado
			})
		)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

		await queryRunner.dropColumn('appointments', 'provider_id');

		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'provider',
				type: 'varchar'
			})
		);
    }

}
