set(srcs "test_app_main.c"
          "test_dport.c"
          "test_fp.c"
          "test_intr_alloc.c"
          "test_dport_xt_highint5.S"
          "test_ds.c"
          "test_hmac.c"
          "test_random.c"
           )

# In order for the cases defined by `TEST_CASE` to be linked into the final elf,
# the component can be registered as WHOLE_ARCHIVE
idf_component_register(SRCS ${srcs}
                       REQUIRES unity driver test_utils efuse
                       WHOLE_ARCHIVE)
