from pydantic import BaseModel, Field, HttpUrl
from typing import Optional
from datetime import datetime
from enum import Enum

class DriverStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    blocked = "blocked"
class Vehicle_type(str, Enum):
    four_wheeler = "four_wheeler"
    two_wheeler = "two_wheeler"
    auto_rickshaw = "auto_rickshaw"
    e_rickshaw = "e_rickshaw"

class Driver(BaseModel):
    name: str
    email: str
    phone_no: str
    vehicle_type: Vehicle_type
    car_no: str
    address: str
    created_at: Optional[str] = Field(default_factory=lambda: datetime.utcnow().isoformat())
    verify_at: Optional[str] = None
    updated_at: Optional[str] = None
    rating: float = 0.0
    dob: Optional[str] = None
    documents_verified: bool
    profile_image_url: Optional[HttpUrl] = None
    license_url: HttpUrl
    insurance_url: HttpUrl
    status: DriverStatus = DriverStatus.pending

class DriverDocumentsUpdate(str,Enum):
    profile_image="profile_image"
    license="license"
    insurance="insurance"