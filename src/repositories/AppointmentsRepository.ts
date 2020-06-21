import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

// DTO -> Data Transfer Object

//passa a model
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {  // passa model como parametro para Repository
	public async findByDate(date: Date): Promise<Appointment | null> {
		const findAppointment = await this.findOne({
			where: { date: date }
		})

		return findAppointment || null;
	}
}

export default AppointmentsRepository;