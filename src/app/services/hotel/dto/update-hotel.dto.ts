import { ObjectID } from 'typeorm';
import { Location } from '../../location/location.entity';

export class UpdateHotelDto {
  readonly location_id?: string;
  readonly name?: string;
  readonly num_reviews?: string;
  readonly latitude?: string;
  readonly longitude?: string;
  readonly timezone?: string;
  readonly location_string?: string;
  readonly api_detail_url?: string;
  readonly doubleclick_zone?: string;
  readonly preferred_map_engine?: string;
  readonly raw_ranking?: string;
  readonly ranking_geo?: string;
  readonly ranking_geo_id?: string;
  readonly ranking_position?: string;
  readonly ranking_denominator?: string;
  readonly ranking_category?: string;
  readonly ranking?: string;
  readonly subcategory_type?: string;
  readonly subcategory_type_label?: string;
  readonly distance_string?: string;
  readonly rating?: string;
  readonly is_closed?: boolean;
  readonly is_long_closed?: boolean;
  readonly price_level?: string;
  readonly hotel_class?: string;
  readonly description?: string;
  readonly web_url?: string;
  readonly write_review?: string;
  readonly parent_display_name?: string;
  readonly is_jfy_enabled?: boolean;
  readonly phone?: string;
  readonly address?: string;
  readonly is_candidate_for_contact_info_suppression?: boolean;

  readonly location?: Location;
  readonly locationID?: string;
  readonly locationObjectID?: ObjectID;
  readonly created_at?: Date;
}
