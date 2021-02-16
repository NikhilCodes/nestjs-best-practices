nest g mo $1 modules # Module
nest g co $1 modules # Controller
nest g s $1 modules  # Service

# If any changes were attempted, make sure
# module creation is done before any other
# fragments[i.e., Controller, Service, ...] are
# generated.
